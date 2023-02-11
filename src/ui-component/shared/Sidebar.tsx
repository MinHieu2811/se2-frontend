/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Collapse, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GrMoreVertical } from 'react-icons/gr'
import { AiFillHome } from 'react-icons/ai'

type Props = {};
type UIprops = {
  basicUiMenuOpen: boolean;
  formElementsMenuOpen: boolean;
  tablesMenuOpen: boolean;
  chartsMenuOpen: boolean;
  iconsMenuOpen: boolean;
  errorPagesMenuOpen: boolean;
  userPagesMenuOpen: boolean;
};

const dropdownPaths = [
  {path:'/apps', state: 'appsMenuOpen'},
  {path:'/basic-ui', state: 'basicUiMenuOpen'},
  {path:'/form-elements', state: 'formElementsMenuOpen'},
  {path:'/tables', state: 'tablesMenuOpen'},
  {path:'/icons', state: 'iconsMenuOpen'},
  {path:'/charts', state: 'chartsMenuOpen'},
  {path:'/user-pages', state: 'userPagesMenuOpen'},
  {path:'/error-pages', state: 'errorPagesMenuOpen'},
];

const Sidebar = (props: Props) => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  // const logo = require('../../assets/images/address-book.svg') as string
  const [config, setConfig] = useState<UIprops>({
    basicUiMenuOpen: false,
    formElementsMenuOpen: false,
    tablesMenuOpen: false,
    chartsMenuOpen: false,
    iconsMenuOpen: false,
    errorPagesMenuOpen: false,
    userPagesMenuOpen: false,
  });

  function toggleMenuState(name: string) {
    if ([name]) {
      setConfig({
        ...config,
        [name]: false,
      });
    } else if (Object.keys(config).length === 0) {
      setConfig({
        ...config,
        [name]: true,
      });
    } else {
      Object.keys(config).forEach((el) => {
        setConfig({
          ...config,
          [el]: false,
        });
      });
      setConfig({
        ...config,
        [name]: true,
      });
    }
  }

  function onRouteChanged() {
    sidebarRef?.current?.classList.remove("active")
    Object.keys(config).forEach(i => {
      setConfig({...config, [i]: false});
    });

    dropdownPaths.forEach((el) => {
      if(isPathActive(el.path)) {
        setConfig({...config, [el.state]: true})
      }
    })
  }

  useEffect(() => {
    onRouteChanged()

    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body?.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body?.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }, [])

  function isPathActive(path: string) {
    return window.location.pathname.startsWith(path);
  }
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar" ref={sidebarRef}>
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <h1>Dashboard</h1>
      </div>
      <ul className="nav">
        <li className="nav-item profile">
          <div className="profile-desc">
            <div className="profile-pic">
              <div className="count-indicator">
                <div className="avatar">H</div>
                <span className="count bg-success"></span>
              </div>
              <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">Henry Klein</h5>
                <span>Gold Member</span>
              </div>
            </div>
            <Dropdown>
              <Dropdown.Toggle as="a" className="cursor-pointer no-caret">
                <GrMoreVertical />
              </Dropdown.Toggle>
              <Dropdown.Menu className="sidebar-dropdown preview-list">
                <a
                  href="!#"
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-primary"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      Account settings
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a
                  href="!#"
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword  text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      Change Password
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a
                  href="!#"
                  className="dropdown-item preview-item"
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar-today text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      To-do list
                    </p>
                  </div>
                </a>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">Navigation</span>
        </li>
        <li
          className={
            isPathActive("/")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <Link className="nav-link" to="/dashboard">
            <span className="menu-icon">
              <AiFillHome />
            </span>
            <span className="menu-title">Home</span>
          </Link>
        </li>
        <li
          className={
            isPathActive("/basic-ui")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              config?.basicUiMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("basicUiMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-laptop"></i>
            </span>
            <span className="menu-title">Basic UI Elements</span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={config?.basicUiMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/buttons")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/buttons"
                  >
                    Buttons
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/dropdowns")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/dropdowns"
                  >
                    Dropdowns
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/basic-ui/typography")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/basic-ui/typography"
                  >
                    Typography
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/form-elements")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              config?.formElementsMenuOpen
                ? "nav-link menu-expanded"
                : "nav-link"
            }
            onClick={() => toggleMenuState("formElementsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-playlist-play"></i>
            </span>
            <span className="menu-title">Form Elements</span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={config?.formElementsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/form-elements/basic-elements")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/form-elements/basic-elements"
                  >
                    Basic Elements
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/tables")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              config?.tablesMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("tablesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-table-large"></i>
            </span>
            <span className="menu-title">Tables</span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={config?.tablesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/tables/basic-table")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/tables/basic-table"
                  >
                    Basic Table
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/charts")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              config?.chartsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("chartsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-chart-bar"></i>
            </span>
            <span className="menu-title">Charts</span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={config?.chartsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/charts/chart-js")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/charts/chart-js"
                  >
                    Chart Js
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/icons")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              config?.iconsMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("iconsMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-contacts"></i>
            </span>
            <span className="menu-title">Icons</span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={config?.iconsMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/icons/mdi")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/icons/mdi"
                  >
                    Material
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li
          className={
            isPathActive("/user-pages")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              config?.userPagesMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("userPagesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-security"></i>
            </span>
            <span className="menu-title">User Pages</span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={config?.userPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/login-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/login-1"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/register-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/register-1"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className="nav-item nav-category">
          <span className="nav-link">More</span>
        </li>
        <li
          className={
            isPathActive("/error-pages")
              ? "nav-item menu-items active"
              : "nav-item menu-items"
          }
        >
          <div
            className={
              config?.errorPagesMenuOpen ? "nav-link menu-expanded" : "nav-link"
            }
            onClick={() => toggleMenuState("errorPagesMenuOpen")}
            data-toggle="collapse"
          >
            <span className="menu-icon">
              <i className="mdi mdi-lock"></i>
            </span>
            <span className="menu-title">Error Pages</span>
            <i className="menu-arrow"></i>
          </div>
          <Collapse in={config?.errorPagesMenuOpen}>
            <div>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/error-pages/error-404")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/error-pages/error-404"
                  >
                    404
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/error-pages/error-500")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/error-pages/error-500"
                  >
                    500
                  </Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className="nav-item menu-items">
          <a
            className="nav-link"
            href="http://bootstrapdash.com/demo/corona-react-free/documentation/documentation.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="menu-icon">
              <i className="mdi mdi-file-document-box"></i>
            </span>
            <span className="menu-title">Documentation</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
