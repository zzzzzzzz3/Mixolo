import {createAction,Storage} from "../utils";
import NavigationActions from "react-navigation/src/NavigationActions";
import * as authService from '../service/auth';
import {Toast} from "antd-mobile/lib/index";

const AppModel =  {
    //命名空间
    namespace:"app",
    //model的数据
    state:{
        user:null
    },
    //修改数据的唯一途径,同步方式
    reducers:{
        updateState(state, { payload }) {
            return { ...state, ...payload }
        },
    },
    //异步方式，最终会通过reducers修改数据
    effects:{
        //加载缓存
        *loadStorage(action, { call, put }) {
            const user = yield call(Storage.get, 'user');
            yield put(createAction('updateState')({ user:user}))
        },
        //请求登录
        *login({ payload }, { call, put }) {
            Toast.loading('loading',0);
            const data = yield call(authService.login, payload);
            Toast.hide();
            if (data.status === 'success') {
                yield put(createAction('updateState')({ user:data.user_data}));
                //重置导航栈
                yield put(
                    NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Main' })],
                    })
                );
                call(Storage.set,'user',data.user_data);
            }else {
                Toast.info(data.error?data.error:'Invalid userid or password.',1)
            }
        },
    },
    //用于订阅数据源，例如键盘输入等
    subscriptions:{
        //在app载入时触发
        setup({ dispatch }) {
            dispatch({ type: 'loadStorage' })
        },
    }
};

export default AppModel