const Input = ({ icon: Icon, ...props }) => {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="size-5 text-gray-500" />
            </div>
            <input
                {...props}
                className="w-full pl-10 pr-3 py-2 bg-gray-300 bg-opacity-50 rounded-lg border border-gray-400 text-black placeholder-gray-500"
            />
        </div>
    );
};

export default Input;
