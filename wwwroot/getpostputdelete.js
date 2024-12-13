const fetchmyData = async (url, data) =>
{
    let [id] = data;
    let response = await fetch(url+id);
    let result = await response.json();
    return result;
}

// et familyDataById = await fetchmyData("./api/family/", [2])

    const deleteMyData = async (url, data) =>
    {
            let [id] = data;
            let response = await fetch(url+id,{
                method: 'DELETE'
            });
        
        return response.ok;
    }
    
    const putMyData = async (url, data) =>
        {
            let [id] = data;
            let response = await fetch(url+id,{
                method: 'PUT'
            });
            
            return response.ok;
        }
    const getMyData = async (url, data) =>
    {
            let [id] = data;
            let response = await fetch(url+id,{
                method: 'GET'
            });
        
            return response.ok;
    }
    
    const postMyData = async (url, data) =>
        {
            let [id] = data;
            let response = await fetch(url+id,{
                method: 'POST'
            });
            
            return response.ok;
        }
        

        

    