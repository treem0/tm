import React, { Component } from "react";
import TopBar from "./Components/TopBar";
import FooterMenu from "./Components/FooterMenu";
import Content from "./Components/Content";
import Sidebar from "./Components/Sidebar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }

  render() {
    const { windowWidth } = this.state;

    const sidebarCollapsed = windowWidth < 1100;

    const styles = {
      white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      topBarHeight: 90,
      footerMenuHeight: 50,
      showFooterMenuText: windowWidth > 500,
      showSidebar: windowWidth > 768,
      sidebarCollapsed,
      sidebarWidth: sidebarCollapsed ? 50 : 150
    };

    const menuItems = [
      { icon: `<>`, text: "Home" },
      { icon: `<>`, text: "About" },
      { icon: `<>`, text: "Skills" },
      { icon: `<>`, text: "Projects" },
      { icon: `<>`, text: "Contact" }
    ];

    if(styles.showSidebar) {
      menuItems.push({ icon: <a href="https://github.com/treem0"> <img src="https://img.icons8.com/material-rounded/48/000000/github.png" alt="Github" /> </a>, text: "Github" });
      menuItems.push({ icon: <img src="https://img.icons8.com/android/48/000000/linkedin.png" alt="LinkedIn" />, text: "LinkedIn" });
    }

    return (
      <div
        style={{
          backgroundColor: styles.black(0.05),
          minHeight: "100vh",
          position: "relative"
        }}
      >
        {
          styles.showSidebar ? (
            <Sidebar menuItems={menuItems} styles={styles} />
          ) : (
              <TopBar styles={styles} />
            )
        }

        < Content styles={styles} />

        {!styles.showSidebar && (
          <FooterMenu menuItems={menuItems} styles={styles} />
        )}
      </div >
    );
  }
}

export default App;
