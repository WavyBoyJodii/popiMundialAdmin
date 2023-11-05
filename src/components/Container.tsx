interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="container mx-auto w-full">{children}</div>;
};

export default Container;
