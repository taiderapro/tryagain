import { createTheme, rem } from "@mantine/core";

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: "Open Sans, sans-serif",
  fontSizes: {
    xs: rem(10),
    sm: rem(12),
    md: rem(14),
    lg: rem(16),
    xl: rem(18),
  },
  components: {
    Button: {
      defaultProps: {
        radius: "sm",
        color: "violet",
      },
    },
  },
  radius: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(10),
    xl: rem(12),
  },
  spacing: {
    xs: rem(4),
    sm: rem(6),
    md: rem(8),
    lg: rem(10),
    xl: rem(12),
  },
});

export default theme;
