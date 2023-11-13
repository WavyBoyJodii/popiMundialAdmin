import Header from '@editorjs/header';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import InlineCode from '@editorjs/inline-code';

export const token = localStorage.getItem('bearer');

export const EDITOR_JS_TOOLS = {
  header: Header,
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: 'https://firstblogbackend-production.up.railway.app/user/link',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
  list: List,
  code: Code,
  inlineCode: InlineCode,
  table: Table,
  embed: Embed,
};
