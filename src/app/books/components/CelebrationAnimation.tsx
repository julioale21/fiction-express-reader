import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const CelebrationAnimation = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    import("@/animations/celebration.json").then((data) => {
      setAnimationData(data.default as any);
    });
  }, []);

  if (!animationData) {
    return null;
  }

  return <Lottie animationData={animationData} loop={true} />;
};

export default CelebrationAnimation;
