const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request-promise');

request('https://thorstore.vn/', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let data = [];

        $('.item').each((index, el) => {
            const imageSrc = $(el).find('.item_img_plus img').attr('src'); // Lấy đường dẫn ảnh
            const fullImageUrl = `https://thorstore.vn/${imageSrc}`; // Thêm URL gốc
            const company = $(el).find('.ten').text(); // Lấy tên sản phẩm
            const address = $(el).find('.sp_gia').text(); // Lấy giá sản phẩm

            data.push({
                image: fullImageUrl, // Đường dẫn ảnh đầy đủ
                company, // Tên sản phẩm
                address // Giá sản phẩm
            });
        });

        // Ghi dữ liệu vào file data.json
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    } else {
        console.log(error);
    }
});
