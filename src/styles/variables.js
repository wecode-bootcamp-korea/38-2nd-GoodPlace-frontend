const variables = {
  flex: (justify = "center", align = "center", direction = "row") => `
    display: flex;
    justify-content: ${justify};
    align-items: ${align};
    flex-direction: ${direction};
  `,
  lightFontWeight: `
  font-weight: 100;`,
  regularFontWeight: `
  font-weight: 400`,
  boldFontWeight: `
  font-weight: 700`,
};

export default variables;
