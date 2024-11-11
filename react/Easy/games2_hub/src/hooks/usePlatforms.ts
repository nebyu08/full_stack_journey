import useData from "./useData"

interface platform{
    id:number;
    name:string;
    slug:string;
}

const usePlatforms=()=> useData<platform>('/platforms/lists/parents');


export default usePlatforms;