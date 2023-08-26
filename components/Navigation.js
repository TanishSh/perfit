import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "@react-spring/web";
import NavigationMenu from "./NavigationMenu";

function Navigation() {
  const [showMenu, setShowMenu] = useState(false);

  const menuTransitions = useTransition(showMenu, {
    from: { opacity: 0, transform: "translateX(-100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-100%)" },
  });

  const maskTransitions = useTransition(showMenu, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <nav>
      <span className="text-xl">
        <FontAwesomeIcon icon={faBars} onClick={() => setShowMenu(!showMenu)} />
      </span>
      {/* 
      {menuMask}
      {menu} */}

      {maskTransitions(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="fixed bg-black-t-50 left-0 top-0 w-full h-full z-50"
              onClick={() => setShowMenu(false)}></animated.div>
          )
      )}

      {menuTransitions(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="fixed bg-white left-0 top-0 w-3/5 h-full z-50 shadow">
              <NavigationMenu closeMenu={() => setShowMenu(false)} />
            </animated.div>
          )
      )}
    </nav>
  );
}

export default Navigation;
