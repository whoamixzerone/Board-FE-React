import { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Board = ({
    id,
    title,
    registerId,
    registerDate,
    props,
}: {
    id: number;
    title: string;
    registerId: string;
    registerDate: string;
    props: any;
}) => {
    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    value={id}
                    onChange={(e) => {
                        props.onCheckboxChange(e.currentTarget.checked, e.currentTarget.value);
                    }}
                />
            </td>
            <td>{id}</td>
            <td>{title}</td>
            <td>{registerId}</td>
            <td>{registerDate}</td>
        </tr>
    );
};

interface IProps {
    isComplete: boolean;
    handleModify: any;
    renderComplete: any;
}

/**
 * BoardList Class
 * @param {SS} e
 */
class BoardList extends Component<IProps> {
    /**
     * @param {SS} props
     */
    constructor(props: any) {
        super(props);
        this.state = {
            boardList: [],
            checkList: [],
        };
    }

    state = {
        boardList: [],
        checkList: [],
    };

    getList = () => {
        Axios.get("http://localhost:8080/", {})
            .then((res) => {
                const { data } = res;
                this.setState({
                    boardList: data,
                });
                this.props.renderComplete();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    /**
     * @param {boolean} checked
     * @param {any} id
     */
    onCheckboxChange = (checked: boolean, id: any) => {
        const list: Array<string> = this.state.checkList.filter((v) => {
            return v != id;
        });

        if (checked) {
            list.push(id);
        }

        this.setState({
            checkList: list,
        });
    };

    handleDelete = () => {
        if (this.state.checkList.length == 0) {
            alert("삭제할 게시글을 선택하세요.");
            return;
        }

        let boardIdList = "";

        this.state.checkList.forEach((v: any) => {
            boardIdList += `'${v}',`;
        });

        Axios.post("http://localhost:8080/delete", {
            boardIdList: boardIdList.substring(0, boardIdList.length - 1),
        })
            .then(() => {
                this.getList();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        this.getList();
    }

    componentDidUpdate() {
        if (!this.props.isComplete) {
            this.getList();
        }
    }

    /**
     * @return { Component } Component
     */
    render() {
        // eslint-disable-next-line
        const { boardList }: { boardList: any } = this.state;

        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>No</th>
                            <th>Title</th>
                            <th>Writer</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // eslint-disable-next-line
                            boardList.map((v: any) => {
                                return (
                                    <Board
                                        id={v.id}
                                        title={v.title}
                                        registerId={v.registerId}
                                        registerDate={v.registerDate}
                                        key={v.id}
                                        props={this}
                                    />
                                );
                            })
                        }
                    </tbody>
                </Table>
                <Button variant="info">Write</Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        this.props.handleModify(this.state.checkList);
                    }}
                >
                    Revise
                </Button>
                <Button variant="danger" onClick={this.handleDelete}>
                    Delete
                </Button>
            </div>
        );
    }
}

export default BoardList;
