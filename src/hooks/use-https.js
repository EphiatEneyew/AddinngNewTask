import { useState, useCallback } from "react";
/*this customhook should be send any kind of requests to any kind of URL AND TO DO ANy kind of data transformation but it 
should always manage the same state loading and error and execute the same steps in the same order.
to make that hooks to be flexible, we ofcourse also will need some parameter to configer it on function.
in this logic the request logic that need to be configerable the URL, but also the method, the body, the headers this all needs to be flexible.
what this Cstom hooks do: 1,send both POST and GET request(method) to any URL,
                          2,it make data transformation(JASON data format to JavaScript object and vice verce.
what we do with the data is highly specific therefore it should not be part of the hook.the concret data transformation is specific to the comonnent 
after we get the data we call the function of component which uses this customhook which execute or uses or transform the data.this function may be pass as a parameter
                          3,it analysis the response and manage the LOADING and ERROR state 
*/

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
   
  
    const sendRequest = useCallback(async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          requestConfig.url, {
          method: requestConfig.method ? requestConfig.method: 'GET',
          headers: requestConfig.headers ? requestConfig.headers: {} ,
          body: requestConfig.body ? JSON.stringify(requestConfig.body): null,
          }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
        applyData(data);//the function provided by the component which specifies what happen on the data
  
      
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    }, [])
   return {
    isLoading,
    error,
    sendRequest
   }
  
};

/*the components which use this customhooks have an access for LOADIN and ERROR state which is managed by 
the customhooks.
and for the sendRequest function which trigger the request*/
export default useHttp;