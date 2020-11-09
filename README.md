# SoTay - Base (FTU)

#### Cấu trúc các thư mục:
##### config: các config về router, plugin, webpack, ...
##### dist: bản web sau khi được build và deploy sẽ ở đây
##### docker: config docker, hiện tại chưa sử dụng
##### functions: không sử dụng
##### mock: fake api khi backend chưa hoạt động
##### node_modules: toàn bộ các package liên quan project, không up lên git, thông tin ở trong file package.json
##### src: toàn bộ code nằm ở đây.
### Cấu trúc của src: 
##### assets: chứa ảnh, icon, video, ...etc.
##### components: chứa các component built-in của antd hoặc dev - các đoạn code tái sử dụng được 
##### e2e: chưa sử dụng
##### layouts: thiết kế bố cục của trang web, ví dụ sidebar bên trái, header bên trên, component ở giữa
##### locales: ngôn ngữ
##### models: chứa các models của dva(redux) - quản lý state của ứng dụng.
##### pages: chứa các phần của trang web: page1, page2,...., pageN.
##### services: chứa các file gọi api, các api này được sử dụng ở models.
##### utils: chứa các file js với các tính năng liên quan tới config. 
	
# Cách thêm block mới
1. Usages: 
umi block add https://github.com/mikelhpdatke/UmiJS-Base-Block --path=SinhVien

2. 
- Nếu model này cần dùng global (tưc là ở những page khác cũng cần dùng model này thì chạy lệnh sau): 
sudo mv src/pages/SinhVien/model.tsx src/models/sinhvien.tsx
- Ngược lại, model sẽ chỉ truy cập trong page đó.

3. 
- Tác dụng: tạo 1 trang mới ở đường dẫn src/pages/SinhVien kèm theo các file: SinhVien/models/model.tsx (namespace: 'sinhvien') src/services/SinhVien. 
- Chỉ cần config ở file index.js (chứa Table) và Form.js trong SinhVien/Sample là xong # UmiJS-Base-Block


 # Cách sử dụng Jest 
 https://jestjs.io/docs/en/getting-started.html
 
 1. các file test có dạng *.test.js trong tạo trong thư mục ./src

 2. Tác dụng: Test components, function,... tránh trường hợp xảy ra lỗi bất kì trước khi ghép vào dự án  

3. - Jest sử dụng "matcher" để test. Ví dụ: 

        test('two plus two is four', () => {
            expect(2 + 2).toBe(4);
        });
    - List expect API doc: https://jestjs.io/docs/en/expect

4. Ví dụ test snapshot 1 component <LinkTest/> (./src/components/LinkTest) sử dụng snapshot kiểm tra hàm khi chuột hover vào có xảy ra thay đổi không mong muốn
    - react-test-renderer: render 1 component React thành Js object để dễ dàng snapshot 
    - .toMatchSnapShot(): tạo ra 1 file .test.js.snap. Những lần snapshot sau sẽ kiểm tra nếu như snapshot sinh ra khác file .snap -> component có thay đổi khác -> test fail


# Config Jest with enzyme
    - Cần phải config Adapter của enzyme để có thể sử dụng các API cao hơn của Enzyme
    - Trong file setupTests.js (./tests/setupTests.js) thên 

        import { configure } from 'enzyme';
        import Adapter from 'enzyme-adapter-react-16';

        configure({ adapter: new Adapter() });
    - Ví dụ trong Success.test.js

# Các bước deploy bản mới ở nhánh master:
1. Chỉnh sửa $version trong file package.json để bên client có thể xác định được version của bản hiện tại.
2. git add .
3. git commit -m 'upgrade version x.x.x'
4. Chạy lệnh git tag -a <$version> -m '<Mô tả>'
5. Chạy lệnh git push origin <$version>.
6. Chạy git push origin master (Gitlab CI sẽ tựu động deploy lên vps production và tự động gọi lệnh api update version)

# Trường hợp deploy bản development Dev chủ động dùng vercel deploy bằng tay nhé.
