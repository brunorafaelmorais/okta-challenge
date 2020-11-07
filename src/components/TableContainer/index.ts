import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;

  table {
    min-width: 100%;
    border: 0;
    white-space: nowrap;
    border-collapse: collapse;
    table-layout: fixed;
  }

  table th,
  table td {
    padding: 0.75rem;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  table td {
    border-top: 1px solid #dee2e6;
  }

  table th {
    font-weight: 500;
    text-align: left;
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
  }

  table button,
  table a {
    border: 0;
    outline: none;
    background-color: transparent;
    color: #999;
    transition: color 0.2s;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    padding: 0;

    &:not(:last-child) {
      margin-right: ${({ theme }) => theme.settings.gutterSm};
    }
  }

  table a:hover,
  table button:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  table tbody tr:not(:hover) button,
  table tbody tr:not(:hover) a {
    opacity: 0;
    visibility: hidden;
  }
`;
