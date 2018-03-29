import { Font } from "expo";

export const loadFonts = () =>
  Font.loadAsync({
    "bangers-regular": require("../../assets/fonts/Bangers-Regular.ttf"),
    "quicksand-regular": require("../../assets/fonts/Quicksand-Regular.ttf"),
    "quicksand-light": require("../../assets/fonts/Quicksand-Light.ttf"),
    "quicksand-bold": require("../../assets/fonts/Quicksand-Bold.ttf"),
  });
