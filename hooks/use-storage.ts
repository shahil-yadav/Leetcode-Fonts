// loved the trick to use `location.reload(true)` to debug this hook hehe 😂❤️
/** This hooks lets me use WXT Storage library in reactive way */
export function useStorage<T>(key: StorageItemKey) {
  const [val, setVal] = useState<T | null>(null);

  // useEffect is a React Hook that lets you synchronize a component with an external system.
  useEffect(() => {
    //   await storage.getItem("local:installDate");
    async function asyncEffect() {
      const strgVal = await storage.getItem<T>(key);
      setVal(strgVal);
    }

    // Load the initial value from the storage using this asynchronus function
    asyncEffect();

    // Register an event listener to watch for value changes in storage
    const unwatch = storage.watch<T>(key, (newVal) => setVal(newVal));

    // Implement cleanup function to delete the registered event listener use to watch for value changes in storage
    return () => unwatch();
  }, []);

  return val;
}
