const basePost = {
    AppID: "9999",
    Nonce: "abcd",
    TerminalType: "pcweb",
    TerminalVersion: "1.0.0",
    AccountID:"",
    TenantID:"",
    AccountType:'',
    BelongCompanyId:'',
    BelongStationId:''
}
let postda = {
    ...basePost,
    ReqTime:new Date().getTime(),
    PageNumber:1,
    PageSize:3,
    TenantKey:0
};

export const getCookie = (state)=>{
    if(sessionStorage.getItem('userData')){
        state.userData = JSON.parse(sessionStorage.getItem('userData'))
    }else{
        state.userData = "";
    }
    postda.AccountID = state.userData.AccountId
    postda.AccountType = state.userData.AccountType
    if(state.userData){
        postda.BelongCompanyId = state.userData.BelongCompanyId;
        postda.BelongStationId = state.userData.BelongStationId;
        postda.BelongRoleId = state.userData.BelongRoleId;
        postda.SuperAdminId = state.userData.SuperAdminId;
        postda.TenantBelongType = state.userData.TenantBelongType;
    }
    postda.TenantID = parseInt(sessionStorage.getItem('tenantid') ? sessionStorage.getItem('tenantid') : state.userData.TenantId)
    return postda;
}

