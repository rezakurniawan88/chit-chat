const useAcronymUser = (username: string) => {
    return username?.split(/\s+/g).slice(0, 2).map((word: string | number[]) => word[0]).join('').toUpperCase();
}

export default useAcronymUser;