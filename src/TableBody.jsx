import React from 'react';
import PropTypes from 'prop-types';

import TableBodyRow from './TableBodyRow';
import TableBodyExpandedRow from './TableBodyExpandedRow';

class TableBody extends React.Component {
  constructor() {
    super();

    this.toggleRowExpand = this.toggleRowExpand.bind(this);

    this.state = {
      expandedRowIndices: {}
    };
  }

  toggleRowExpand(idx) {
    this.setState(prevState => {
      const { expandedRowIndices = {} } = prevState;
      expandedRowIndices[idx] = !expandedRowIndices[idx];
      return { expandedRowIndices };
    });
  }

  render() {
    const { columns, dataSource, onRowClick, onRowExpand } = this.props;
    const { expandedRowIndices } = this.state;

    return (
      <tbody>
        {dataSource.map((rowData, idx) => [
          <TableBodyRow
            key={idx}
            idx={idx}
            columns={columns}
            onClick={onRowClick}
            isExpandable={!!onRowExpand}
            onExpandClick={this.toggleRowExpand}
            rowData={rowData}
          />,
          expandedRowIndices[idx] ? (
            <TableBodyExpandedRow key={`${idx}-expanded-row`} columnsCount={columns.length}>
              {onRowExpand(rowData, idx)}
            </TableBodyExpandedRow>
          ) : null
        ])}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.node,
      titleTooltip: PropTypes.string,
      width: PropTypes.number
    })
  ),
  dataSource: PropTypes.arrayOf(PropTypes.object),
  /**
   * Function to be invoked when a row is clicked
   *
   * Function(rowData, rowIndex):void
   */
  onRowClick: PropTypes.func,
  /**
   * Function to be invoked when a row expand icon is clicked
   * The expand icon will be included by default if you provide a onRowExpand function
   *
   * Function(rowData, rowIndex):ReactNode|[ReactNode]
   */
  onRowExpand: PropTypes.func
};

TableBody.defaultProps = {
  columns: [],
  dataSource: []
};

export default TableBody;