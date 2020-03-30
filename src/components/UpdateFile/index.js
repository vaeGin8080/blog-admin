import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined, StarOutlined } from "@ant-design/icons";
import { getToken, upload } from "@/api";
const { Dragger } = Upload;
class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      domain: "https://upload-z0.qiniup.com/",
      // 这是七牛云空间的外链默认域名
      qiniuaddr: "q7ylzu7qc.bkt.clouddn.com"
    };
  }

  httpRequest = req => {
    // 获取文件后缀
    let filetype = "";
    let fileName = req.file.name;
    let first = fileName.lastIndexOf(".");
    filetype = fileName.substring(first + 1);
    console.log(req);

    const keyname =
      "vae-blog-" +
      new Date().getTime() +
      Math.floor(Math.random() * 100) +
      "." +
      filetype;

    getToken().then(res => {
      const formdata = new FormData();
      formdata.append("file", req.file);
      formdata.append("token", res.data.key);
      formdata.append("key", keyname);
      if (res.code === "200") {
        upload(this.state.domain, formdata).then(resI => {
          message.success("上传成功");
          let url = "http://" + this.state.qiniuaddr + "/" + resI.key;
          this.props.getUrl(url);
        });
      }
    });
  };

  render() {
    const { domain } = this.state;
    const props = {
      name: "file",
      showUploadList: true,
      action: domain,
      customRequest: this.httpRequest
    };
    return (
      <div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </div>
    );
  }
}

export default Update;
