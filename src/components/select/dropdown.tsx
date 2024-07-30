import { ScrollArea } from "../ui/scroll-area";

const Dropdown = ({ list, addItem }: any) => {
    return (
        <div id="dropdown" className="absolute shadow top-100 bg-white z-40 w-[90%] left-6 rounded overflow-y-auto">
            <ScrollArea className="h-full max-h-44">
                <div className="flex flex-col w-full">
                    {list.map((item: any, key: any) => {
                        return <div key={key}
                            className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-blue-100"
                            onClick={() => addItem(item)}>
                            <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100" >
                                <div className="w-full items-center flex">
                                    <div className="mx-2 leading-6 text-sm">{item.username}</div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </ScrollArea>
        </div>
    );
};

export default Dropdown;