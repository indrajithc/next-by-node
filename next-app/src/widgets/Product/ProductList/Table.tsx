import { FC } from "react";

import IconDot from "@icons/IconDot";
import IconEdit from "@icons/IconEdit";
import IconDelete from "@icons/IconDelete";
import IconSort from "@icons/IconSort";
import IconChevronDown from "@icons/IconChevronDown";
import IconChevronLeft from "@icons/IconChevronLeft";
import IconChevronRight from "@icons/IconChevronRight";

interface TableFooterProps {}

const TableFooter: FC<TableFooterProps> = () => {
  return (
    <div className="pagination-panel">
      <div className="justify-content-between gy-2 row">
        <div className="col-md-4">
          <div className="align-items-center g-0 row">
            <div className="col-auto">
              <p className="me-2">Show</p>
            </div>
            <div className="col-auto">
              <div className="dropdown">
                <button type="button" aria-haspopup="true" aria-expanded="false" className="btn btn-dropdown">
                  5
                  <IconChevronDown className="icon xs fill-black caret" />
                </button>
                <div role="menu" aria-hidden="true" className="dropdown-menu">
                  <button type="button" role="menuitem" className="dropdown-item">
                    10
                  </button>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <p className="ms-2">Entries</p>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-auto">
          <div className="justify-content-center row">
            <div className="col-auto">
              <nav className="" aria-label="pagination">
                <ul className="pagination">
                  <li className="page-item">
                    <a href="#" aria-label="Previous" className="page-link">
                      <IconChevronLeft className="icon xs fill-black" />
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="active page-link">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="page-link">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="page-link">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="page-link">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a href="#" className="page-link">
                      5
                    </a>
                  </li>
                  <li className="page-item disabled">
                    <a href="#" aria-label="Next" className="page-link">
                      <IconChevronRight className="icon xs fill-black" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TableRowProps {}

const TableRow: FC<TableRowProps> = () => {
  return (
    <div className="table-row">
      <div className="row">
        <div className="col-auto d-md-none">
          <div className="flex-column gy-1 row">
            <div className="col-auto">
              <b>Name</b>
            </div>
            <div className="col-auto">
              <b>Description</b>
            </div>
            <div className="col-auto">
              <b>API Keys</b>
            </div>
            <div className="col-auto">
              <b>Time Stamp</b>
            </div>
            <div className="col-auto">
              <b>Enable/Disable</b>
            </div>
            <div className="col-auto">
              <b>Actions</b>
            </div>
          </div>
        </div>
        <div className="col-6 col-md">
          <div className="flex-column flex-md-row gy-1 row">
            <div className="col-auto col-md">Test-Apps</div>
            <div className="col-auto col-md">Azure</div>
            <div className="col-auto col-md-4">
              <p className="text-truncate" id="key-Test-Apps">
                sdhgdg /something.
              </p>
            </div>
            <div className="col-auto col-md">13/05/2022</div>
            <div className="col-auto col-md">
              <div className="mb-0 form-check form-switch">
                <input type="checkbox" className="form-check-input" />
              </div>
            </div>
            <div className="col-auto col-md">
              <div className="dropdown">
                <button type="button" aria-haspopup="true" aria-expanded="false" className="btn btn-link">
                  <IconDot className="icon sm fill-muted" />
                </button>
                <div role="menu" aria-hidden="true" className="dropdown-menu">
                  <button type="button" role="menuitem" className="dropdown-item">
                    <IconEdit className="icon sm fill-muted me-1" />
                    Edit
                  </button>
                  <button type="button" role="menuitem" className="dropdown-item">
                    <IconDelete className="icon sm fill-muted me-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TableHeadProps {}

const TableHead: FC<TableHeadProps> = () => {
  return (
    <div className="table-head">
      <div className="gy-1 row">
        <div className="col-sm-12 col-md">
          <a className="icon-hide">
            Name
            <IconSort className="icon sm fill-muted ms-2" />
          </a>
        </div>
        <div className="col-sm-12 col-md">Description</div>
        <div className="col-sm-12 col-md-4">
          <a className="icon-hide">
            API Keys
            <IconSort className="icon sm fill-muted ms-2" />
          </a>
        </div>
        <div className="col-sm-12 col-md">Time Stamp</div>
        <div className="col-sm-12 col-md">Enable/Disable</div>
        <div className="col-sm-12 col-md">Actions</div>
      </div>
    </div>
  );
};

interface TableProps {}

const Table: FC<TableProps> = ({}) => {
  return (
    <div className="table-layout-panel">
      <TableHead />
      <TableRow />
      <TableRow />
      <TableRow />
      <TableFooter />
    </div>
  );
};

export default Table;
