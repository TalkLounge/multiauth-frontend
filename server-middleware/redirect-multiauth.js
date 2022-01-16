export default function (req, res, next) {
    let url = new URL(`${process.env.MULTIAUTH_BACKEND_URL}${req.url}`);
    if (url.searchParams.get("bearer") || url.pathname.indexOf("_loading/sse") != -1 || url.pathname.indexOf(".") != -1) {
        return next();
    }

    url = new URL(`${process.env.MULTIAUTH_BACKEND_URL}/redirect`);
    const params = new URLSearchParams(url.search);
    params.set("url", `${process.env.URL}${req.url}`);
    url.search = `?${params.toString()}`;
    res.writeHead(302, { Location: url.toString() });
    res.end();
}