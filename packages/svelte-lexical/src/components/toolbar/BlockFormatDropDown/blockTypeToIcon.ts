import { mdiViewList, mdiCheck, mdiCodeBraces, mdiFormatListNumbered, mdiFormatParagraph, mdiFormatQuoteOpen,
  mdiFormatHeader1, mdiFormatHeader2, mdiFormatHeader3, mdiFormatHeader4, mdiFormatHeader5, mdiFormatHeader6
} from '@mdi/js';

export const blockTypeToIcon = {
  bullet: mdiViewList,
  check: mdiCheck,
  code: mdiCodeBraces,
  h1: mdiFormatHeader1,
  h2: mdiFormatHeader2,
  h3: mdiFormatHeader3,
  h4: mdiFormatHeader4,
  h5: mdiFormatHeader5,
  h6: mdiFormatHeader6,
  number: mdiFormatListNumbered,
  paragraph: mdiFormatParagraph,
  quote: mdiFormatQuoteOpen,
};
