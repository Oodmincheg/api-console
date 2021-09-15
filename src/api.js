function login(login, password) {
        return fetch(
            `https://api.sendsay.ru/general/api/v100/json/${login}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({
                action: 'login',
                login: login,
                passwd: password
                
              }),
            },
          );
    }

const api = {login}

export default api
