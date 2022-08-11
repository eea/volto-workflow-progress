/**
 * Workflow component.
 * @module components/manage/Workflow/Workflow
 */

import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { uniqBy } from 'lodash';
import { toast } from 'react-toastify';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import getWorkflowMapping from '@plone/volto/constants/Workflows';
import { Icon, Toast } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import {
  getContent,
  getWorkflow,
  transitionWorkflow,
} from '@plone/volto/actions';

import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import checkSVG from '@plone/volto/icons/check.svg';

const messages = defineMessages({
  messageUpdated: {
    id: 'Workflow updated.',
    defaultMessage: 'Workflow updated.',
  },
  messageNoWorkflow: {
    id: 'No workflow',
    defaultMessage: 'No workflow',
  },
});

const SingleValue = injectLazyLibs('reactSelect')(({ children, ...props }) => {
  const stateDecorator = {
    marginLeft: '10px',
    marginRight: '10px',
    display: 'inline-block',
    backgroundColor: props.selectProps.value.color || null,
    content: ' ',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
  };
  const { SingleValue } = props.reactSelect.components;
  return (
    <SingleValue {...props}>
      <span style={stateDecorator} />
      {children}
    </SingleValue>
  );
});

const Option = injectLazyLibs('reactSelect')((props) => {
  const stateDecorator = {
    marginLeft: '10px',
    marginRight: '10px',
    display: 'inline-block',
    backgroundColor:
      props.selectProps.value.value === props.data.value
        ? props.selectProps.value.color
        : null,
    content: ' ',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    border:
      props.selectProps.value.value !== props.data.value
        ? `1px solid ${props.data.color}`
        : null,
  };

  const { Option } = props['reactSelect'].components;
  return (
    <Option {...props}>
      <span style={stateDecorator} />
      <div style={{ marginRight: 'auto' }}>{props.label}</div>
      {props.isFocused && !props.isSelected && (
        <Icon name={checkSVG} size="24px" color="#b8c6c8" />
      )}
      {props.isSelected && <Icon name={checkSVG} size="24px" color="#007bc1" />}
    </Option>
  );
});

const DropdownIndicator = injectLazyLibs('reactSelect')((props) => {
  const { DropdownIndicator } = props.reactSelect.components;
  return (
    <DropdownIndicator {...props} data-testid="workflow-select-dropdown">
      {props.selectProps.menuIsOpen ? (
        <Icon name={upSVG} size="24px" color="#007bc1" />
      ) : (
        <Icon name={downSVG} size="24px" color="#007bc1" />
      )}
    </DropdownIndicator>
  );
});

const selectTheme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: 'hotpink',
    primary: '#b8c6c8',
  },
});

const customSelectStyles = {
  control: (styles, state) => ({
    ...styles,
    border: 'none',
    borderBottom: '2px solid #b8c6c8',
    boxShadow: 'none',
    borderBottomStyle: state.menuIsOpen ? 'dotted' : 'solid',
  }),
  menu: (styles, state) => ({
    ...styles,
    top: null,
    marginTop: 0,
    boxShadow: 'none',
    borderBottom: '2px solid #b8c6c8',
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    width: null,
  }),
  valueContainer: (styles) => ({
    ...styles,
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: null,
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 12px',
    color: state.isSelected
      ? '#007bc1'
      : state.isFocused
      ? '#4a4a4a'
      : 'inherit',
    ':active': {
      backgroundColor: null,
    },
  }),
};

/* #131062 use title instead of id if we find the current workflow id in the history props */
const selectedWorkflow = (props, workflow_id) => {
  const current_state = props.contentHistory.filter((value) => {
    return value.review_state === props.content.review_state;
  });
  return (current_state.length && current_state[0]['title']) || workflow_id;
};

/**
 * Workflow container class.
 * @class Workflow
 * @extends Component
 */
class Workflow extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getContent: PropTypes.func.isRequired,
    getWorkflow: PropTypes.func.isRequired,
    transitionWorkflow: PropTypes.func.isRequired,
    workflowLoaded: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
    contentHistory: PropTypes.arrayOf(
      PropTypes.shape({
        review_state: PropTypes.string,
      }),
    ),
    transitions: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        title: PropTypes.string,
      }),
    ),
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    contentHistory: [],
    transitions: [],
  };

  state = {
    selectedOption: this.props.content.review_state
      ? getWorkflowMapping(
          this.props.content.review_state,
          selectedWorkflow(this.props, this.props.content.review_state),
        )
      : {},
  };

  componentDidMount() {
    this.props.getWorkflow(this.props.pathname);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getWorkflow(nextProps.pathname);
    }
    if (!this.props.loaded && nextProps.loaded) {
      this.props.getWorkflow(nextProps.pathname);
    }
    if (!this.props.workflowLoaded && nextProps.workflowLoaded) {
      this.props.getContent(nextProps.pathname);
      // #153145 - Redirect to the newly created version
      if (this.state.selectedOption?.value === 'createNewVersion') {
        this.props.history.push(`${nextProps.pathname}.1`);
      }
    }

    if (!this.props.error && nextProps.error) {
      // #147129 - Redirect copy_of_ after rename via content-rules
      if (nextProps.pathname.includes('copy_of_')) {
        this.props.history.push(nextProps.pathname.replace('copy_of_', ''));
      }
      // #153145 - Redirect .1 version after rename via content-rules
      if (nextProps.pathname.endsWith('.1')) {
        this.props.history.push(nextProps.pathname.slice(0, -2));
      }
    }
  }

  /**
   * On transition handler
   * @method transition
   * @param {string} event Event object
   * @returns {undefined}
   */
  transition = (selectedOption) => {
    this.props.transitionWorkflow(flattenToAppURL(selectedOption.url));
    this.setState({ selectedOption });
    toast.success(
      <Toast
        success
        content={this.props.intl.formatMessage(messages.messageUpdated)}
      />,
    );
  };

  selectValue = (option) => {
    const stateDecorator = {
      marginLeft: '10px',
      marginRight: '10px',
      display: 'inline-block',
      backgroundColor: option.color || null,
      content: ' ',
      height: '10px',
      width: '10px',
      borderRadius: '50%',
    };
    return (
      <Fragment>
        <span style={stateDecorator} />
        <span className="Select-value-label">{option.label}</span>
      </Fragment>
    );
  };

  optionRenderer = (option) => {
    const stateDecorator = {
      marginLeft: '10px',
      marginRight: '10px',
      display: 'inline-block',
      backgroundColor:
        this.state.selectedOption.value === option.value ? option.color : null,
      content: ' ',
      height: '10px',
      width: '10px',
      borderRadius: '50%',
      border:
        this.state.selectedOption.value !== option.value
          ? `1px solid ${option.color}`
          : null,
    };

    return (
      <Fragment>
        <span style={stateDecorator} />
        <span style={{ marginRight: 'auto' }}>{option.label}</span>
        <Icon name={checkSVG} size="24px" />
      </Fragment>
    );
  };

  render() {
    const { selectedOption } = this.state;
    const { Placeholder } = this.props.reactSelect.components;
    const Select = this.props.reactSelect.default;

    return (
      <Fragment>
        <label htmlFor="state-select">
          <FormattedMessage id="State" defaultMessage="State" />
        </label>
        <Select
          name="state-select"
          className="react-select-container"
          classNamePrefix="react-select"
          isDisabled={
            !this.props.content.review_state ||
            this.props.transitions.length === 0
          }
          options={uniqBy(
            // Remove markForDeletion transition if item is published
            // in order not to un-publish items by mistake. This transition
            // can still be executed from /contents - refs #153145
            this.props.transitions
              .map((transition) => {
                if (
                  transition?.['@id']?.endsWith('markForDeletion') &&
                  this.props?.content?.review_state === 'published'
                ) {
                  return false;
                }
                return getWorkflowMapping(
                  transition['@id'],
                  transition['title'],
                );
              }, 'label')
              .filter((item) => item),
          ).concat(selectedOption)}
          styles={customSelectStyles}
          theme={selectTheme}
          components={{
            DropdownIndicator,
            Placeholder,
            Option,
            SingleValue,
          }}
          onChange={this.transition}
          defaultValue={
            this.props.content.review_state
              ? selectedOption
              : {
                  label: this.props.intl.formatMessage(
                    messages.messageNoWorkflow,
                  ),
                  value: 'noworkflow',
                }
          }
          isSearchable={false}
        />
      </Fragment>
    );
  }
}

export default compose(
  injectIntl,
  injectLazyLibs(['reactSelect']),
  withRouter,
  connect(
    (state) => ({
      loaded: state.workflow.transition.loaded,
      error: state.workflow.get.error,
      workflowLoaded: state.workflow.get.loaded,
      content: state.content.data,
      contentHistory: state.workflow.history,
      transitions: state.workflow.transitions,
    }),
    { getContent, getWorkflow, transitionWorkflow },
  ),
)(Workflow);
