const basePost = {
    AppID: '9999',
    Nonce: 'abcd',
    TerminalType: 'pcweb',
    TerminalVersion: '1.0.0',
    AccountID: '',
    TenantID: '',
    AccountType: '',
    BelongCompanyId: '',
    BelongStationId: ''
}
const postda = {
    ...basePost,
    ReqTime: new Date().getTime(),
    PageNumber: 1,
    PageSize: 3,
    TenantKey: 0
};

export const getCookie = () => {
    let userData;
    if (sessionStorage.getItem('userData')) {
        userData = JSON.parse(sessionStorage.getItem('userData'))
    } else {
        userData = {};
    }
    postda.AccountID = userData.AccountId
    postda.AccountType = userData.AccountType
    if (userData) {
        postda.BelongCompanyId = userData.BelongCompanyId;
        postda.BelongStationId = userData.BelongStationId;
        postda.BelongRoleId = userData.BelongRoleId;
        postda.SuperAdminId = userData.SuperAdminId;
        postda.TenantBelongType = userData.TenantBelongType;
    }
    postda.TenantID = parseInt(sessionStorage.getItem('tenantid') ? sessionStorage.getItem('tenantid') : userData.TenantId)
    return postda;
}

