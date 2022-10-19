const cookie = require('cookie');

const createToken = (userToken, secretWord, expiresIn) => {
    // console.log(userToken);
    const { __id, email, password, account, name } = userToken;
    return jwt.sign({ __id, email, name, account, password }, secretWord, { expiresIn });
}

export default async function handler(req, res) {

    try {
            res.status(200).setHeader('Set-Cookie', cookie.serialize('Token', null, {
                httpOnly: true,
                secure: process.env.MODE == 'prod',
                maxAge: 0,
                sameSite: 'strict',
                path: '/'
            })).json({success:true });

    } catch (err) {
        // console.log(err)
        res.json({ data: [], error: err.message, success:false  });
    }
}