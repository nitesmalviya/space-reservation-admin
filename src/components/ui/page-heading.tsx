
type PageHeadingProps = {
  title: string;
  description?: string;
};

const PageHeading = ({title,description }:PageHeadingProps) => {
    return (
        <div className="mb-5">
            <h1 className="text-gray-900 mb-1">{title}</h1>
            <p className="text-gray-600 text-sm">
                {description }
            </p>
        </div>
    )
}

export default PageHeading;