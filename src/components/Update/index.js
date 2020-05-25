import React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getToken, realUpload } from "@/api";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      info: {},
    };
  }
  componentDidMount() {}
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          imageUrl,
          loading: false,
        });
      });
    }
  };
  httpRequest = (req) => {
    if (req.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    let fileName = req.file.name;
    let form = new FormData();
    // 后端接受参数 ，可以接受多个参数
    form.append("file", req.file);
    realUpload(form)
      .then((res) => {
        console.log(res.status);
        if (res.status == 1) {
          message.success("上传成功");
          this.setState({
            loading: false,
            imageUrl: res.data.filename,
          });
          console.log(res.data.filename);
          this.props.getImgUrl(res.data.filename);
        } else {
          message.error("上传失败");
        }
      })
      .catch((rej) => {});
    /*  // 获取文件后缀
    let filetype = "";
    let fileName = req.file.name;
    let first = fileName.lastIndexOf(".");
    filetype = fileName.substring(0, first) + new Date().getTime();
    console.log(req);
    getToken().then((res) => {
      console.log(res);
      const formdata = new FormData();
      formdata.append("file", req.file);
      formdata.append("token", res.data.key);
      formdata.append("key", filetype);
      if (res.code === "200") {
        upload(formdata).then((resI) => {
          message.success("上传成功");
          let imgurl = res.data.doman + "/" + resI.key;
          this.setState({
            loading: false,
            imageUrl: imgurl,
          });
          this.props.getImgUrl(imgurl);
        });
      }
    }); */
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl, domain } = this.state;
    const { img, isEdit } = this.props;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={domain}
        customRequest={this.httpRequest}
      >
        {imageUrl ? img : isEdit ? img : uploadButton}
      </Upload>
    );
  }
}

export default Update;
