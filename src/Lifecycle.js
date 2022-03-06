import React, { useEffect, useState } from "react";


// unmount시키려면 mount를 제어하는 useEffect콜백함수가 함수를 리턴하면 unmount된다.
const UnmoutTest = () => {
  useEffect(() => {
    console.log("Mount");
    return () => {
      //Unmount시점에 생성되게 된다.
      console.log("unmount")
    }
  }, []);

  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmoutTest />}
    </div>
  );
};

export default Lifecycle;
