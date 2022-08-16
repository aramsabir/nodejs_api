export enum ApiMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }
  
  export enum ApiEndPoints {

    Login = 'login',
    
    ListUsers='users',
    FindUser='users',
    PostUser='user',
    PutUser='user',

    GetAllRoles='roles??skip={{skip}}&limit={{limit}}&sort={{sort}}',
    PostRole='role',

    SignOut = 'auth/login',
    Check = '',

    StockOut= 'stock_out',
    StockOutList= 'stock_outs',
    StockOutEdit= 'stock_out_for_edit',

    StockIn= 'stock_in',
    StockInList= 'stock_ins',
    StockInEdit= 'stock_in_for_edit',
  }


