import React from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { getToken, upload } from "@/api";

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
      domain: "https://upload-z0.qiniup.com/",
      // 这是七牛云空间的外链默认域名
      qiniuaddr: "q7ylzu7qc.bkt.clouddn.com"
    };
  }
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false
        });
      });
    }
  };
  httpRequest = req => {
    console.log(req);
    if (req.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    // 获取文件后缀
    let filetype = "";
    let fileName = req.file.name;
    let first = fileName.lastIndexOf(".");
    filetype = fileName.substring(first + 1);
    if (req.file.type === "image/png") {
      filetype = "png";
    }
    const keyname =
      "vae-blog-" +
      new Date().getTime() +
      Math.floor(Math.random() * 100) +
      "." +
      filetype;

    getToken().then(res => {
      console.log(res);
      const formdata = new FormData();
      formdata.append("file", req.file);
      formdata.append("token", res.data.key);
      formdata.append("key", keyname);
      if (res.code === "200") {
        upload(this.state.domain, formdata).then(resI => {
          message.success("上传成功");
          let imgurl = "http://" + this.state.qiniuaddr + "/" + resI.key;
          this.setState({
            loading: false,
            imageUrl: imgurl
          });
          this.props.getImgUrl(imgurl);
        });
      }
    });
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl, domain } = this.state;
    const { img } = this.props;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={domain}
        customRequest={this.httpRequest}
      >
        {imageUrl ? img : uploadButton}
      </Upload>
    );
  }
}

export default Update;
