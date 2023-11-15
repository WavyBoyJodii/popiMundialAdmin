import Output from 'editorjs-react-renderer';

type EditorOutputProps = {
  content: unknown;
  className?: string;
};

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    textAlign: 'center',
  },
};

export default function EditorOutput({
  content,
  className,
}: EditorOutputProps) {
  return <Output data={content} style={style} classNames={className} />;
}
