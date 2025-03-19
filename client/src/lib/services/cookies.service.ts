import Cookies from "js-cookie";

const jwt = "CBZC7E24989D07B";

class JWTService {
  static getJWT() {
    return Cookies.get(jwt);
  }

  static setJWT(token: string, expires: number = 1) {
    Cookies.set(jwt, token, { expires });
  }

  static removeJWT() {
    Cookies.remove(jwt);
  }
}

export default JWTService;
