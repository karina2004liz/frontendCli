
import AuthService from "./services/auth.service";
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
import Login from './components/login'
import Home from "./components/home";
import Signin from "./components/register"

const Container =(props)=>{

    const [currentUser, setCurrentUser] = useState(undefined);
    console.log(currentUser)
  
    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        setCurrentUser(user);
      }
    }, []);
  
    const logOut = () => {
      AuthService.logout();
    };
  


    return(
        <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to={"/"} className="nav-link">
                Login
              </Link></Menu.Item>
            <Menu.Item key="2"><Link to={"/singin"} className="nav-link">
                Signin
              </Link></Menu.Item>
              {
                currentUser &&
                <Menu.Item key="3"><Link onClick={logOut} to={"/login"} className="nav-link">
                Logout
              </Link></Menu.Item>
    
              }
            
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px'  }}>
        <div className="site-layout-content">
          

        </div> 
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>WebApp to Clivo</Footer>
      </Layout>
        
    )
}

export default Container