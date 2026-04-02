interface PageHeadingProps {
    title: string;
    description?: string;
    action?: React.ReactNode;  
}

const PageHeading = ({ title, description, action }: PageHeadingProps) => {
    return (
        <div className="flex items-center justify-between mb-5">
            <div>
                <h1 className="text-gray-900 mb-1">{title}</h1>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>

            {/* 👇 render button here */}
            {action && <div>{action}</div>}
        </div>
    );
};

export default PageHeading;