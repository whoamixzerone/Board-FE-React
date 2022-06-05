import { Component } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Axios from "axios";

interface IProps {
    isModifyMode: boolean;
    id: number;
    handleCancel: any;
}

/**
 * Write Class
 * @param {SS} e
 */
class Write extends Component<IProps> {
    /**
     * @param {SS} props
     */
    constructor(props: any) {
        super(props);
        this.state = {
            title: "",
            content: "",
            isRendered: false,
        };
    }

    state = {
        title: "",
        content: "",
        isRendered: false,
    };

    write = () => {
        Axios.post("http://localhost:8080/posts", {
            title: this.state.title,
            content: this.state.content,
        })
            .then((res) => {
                this.setState({
                    title: "",
                    content: "",
                });
                this.props.handleCancel();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    update = () => {
        Axios.patch("http://localhost:8080/patch", {
            title: this.state.title,
            content: this.state.content,
            id: this.props.id,
        })
            .then((res) => {
                this.setState({
                    title: "",
                    content: "",
                });
                this.props.handleCancel();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    detail = () => {
        Axios.get(`http://localhost:8080/detail?id=${this.props.id}`)
            .then((res) => {
                if (res.data.length > 0) {
                    this.setState({
                        title: res.data[0].title,
                        content: res.data[0].content,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // eslint-disable-next-line
    handleChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    /**
     * @param {any} prevProps
     */
    componentDidUpdate = (prevProps: any) => {
        if (this.props.isModifyMode && this.props.id != prevProps.id) {
            this.detail();
        }
    };

    /**
     * @return { Component } Component
     */
    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            placeholder="Enter a title"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="content"
                            value={this.state.content}
                            onChange={this.handleChange}
                            placeholder="Enter a content"
                        />
                    </Form.Group>
                </Form>
                <Button variant="info" onClick={this.props.isModifyMode ? this.update : this.write}>
                    submit
                </Button>
                <Button variant="secondary" onClick={this.props.handleCancel}>
                    cancel
                </Button>
            </div>
        );
    }
}

export default Write;
