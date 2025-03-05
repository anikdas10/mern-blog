export const getEnv = (envname)=>{
    // console.log(envname);
    const env = import.meta.env;
    return env[envname]
}