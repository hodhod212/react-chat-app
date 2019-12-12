import React,{Component} from 'react';
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export class ReactHook extends React.Component{
    state = {
        isLoading:false,
        error:null,
        posts:[]
    }
    componentDidMount(){
        this.setState({isLoading:true})
        fetch(this.props.url)
        .then(res=>{
            if(res.ok){
                return res.json();
            }else{
                throw Error('Error fetching posts')
            }
        })
        .then(posts=>{
            //console.log(posts);
            this.setState({posts:posts,isLoading:false})  
        }).catch(error=>this.setState({
            error
        }))
    }
    render(){
        return this.props.children(this.state);
    }
}
export class AppRenderProps extends React.Component{
    render(){
        return  (
            <div>
                <h1>With Render Props</h1>
                <ReactHook url = {BASE_URL}>
                    {({error,isLoading,posts})=>{
                         if(error){
                            return <p style={{color:'red'}}>{error.message}</p>
                        }
                        if(isLoading){
                            return  <p>Loading posts...</p>
                        }
                        return  (
                            <div>
                                <h1>ReactHook</h1>
                                {posts.map(post=>(
                                    <>
                                    <h3>{post.title}</h3>
                                    <p>{post.body}</p>
                                    </>
                                ))}  
                            </div>
                        )
                    }}
                </ReactHook>
            </div>
        )
    }
}
export function AppHooks(){
    const [] = React.useState([])
    React.useEffect(()=>{
        fetch(BASE_URL)
        .then(res=>{
            if(res.ok){
                return res.json();
            }else{
                throw Error('Error fetching posts')
            }
        })
        .then(posts=>{

        })
    },[])
    return (
        <div>
            <h1>With Hooks</h1>
        </div>
    )
}
export default AppHooks;