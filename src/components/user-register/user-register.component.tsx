import React from 'react';
import Modal from 'react-bootstrap/esm/Modal';
import { defaultIAirline, IAirline } from '../../classes/airlines';
import { defaultIUser } from '../../classes/user';
import { UserRegisterProps } from './user-register.props';
import { defaultUserRegisterState, UserRegisterState } from './user-register.state';

export default class userRegisterComponent extends React.Component<UserRegisterProps, UserRegisterState> {
    constructor(props: UserRegisterProps) {
        super(props);
        this.state = defaultUserRegisterState();

        // Initialize methods
        this.getClickedName = this.getClickedName.bind(this);
        this._onChangeTextInput = this._onChangeTextInput.bind(this);
        this._save = this._save.bind(this);
        this.closeConfirmationMessage = this.closeConfirmationMessage.bind(this);
    }

    componentDidMount() {
        // Get airlines data
        const json = '[{"IdAirline":"1", "Name": "Avianca"},{"IdAirline":"2", "Name": "Latam"},{"IdAirline":"3", "Name": "VivaAir"}]'
        const airlines: IAirline[] = JSON.parse(json);
        this.setState({
            airlines
        })
    }

    render() {
        const items = this.state.airlines.map((item) => {
            return <li key={item.IdAirline} onClick={this.getClickedName.bind(this, item)} className={this.state.selectedAirline.IdAirline == item.IdAirline ? "list-group-item active" : "list-group-item"}>{item.Name}</li>
        })
        return (
            <div className="vh-100 container-fluid">
                <h2>¡Bienvenido!</h2>
                <h5>Por favor selecciona tu aerolinea:</h5>
                <br />
                <ul className="list-group list-group-horizontal-sm justify-content-center">
                    {items}
                </ul>
                <hr />
                {
                    this.state.selectedAirline.Name !== '' &&
                    <div>
                        <p>Hola, bienvenido, sabemos que quieres viajar en un {this.state.selectedAirline.Name}, por favor diligencia el siguiente formulario:</p>
                        <form onSubmit={this._save}>
                            <label className='form-label'>
                                Nombre completo:
                                <br />
                                <input
                                    id="Name"
                                    className="form-control"
                                    type="text"
                                    onChange={this._onChangeTextInput} required />
                                <br />
                                Email:
                                <br />
                                <input
                                    id="Email"
                                    className="form-control"
                                    type="email"
                                    onChange={this._onChangeTextInput} required />
                                <br />
                                Celular:
                                <br />
                                <input
                                    id="Cellphone"
                                    className="form-control"
                                    type="number"
                                    onChange={this._onChangeTextInput} required />
                                <br />
                                Rango de edad:
                                <br />
                                <input
                                    id="Age"
                                    className="form-control"
                                    type="number"
                                    min="18"
                                    onChange={this._onChangeTextInput} required />
                            </label>
                            <br />
                            <input className="btn btn-primary" type="submit" value="Enviar" />
                        </form>
                    </div>
                }
                {
                    this.state.showConfirmationMessage &&
                    <Modal
                        show={this.state.showConfirmationMessage}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header><h4>Registrar usuario</h4></Modal.Header>
                        <Modal.Body>Tu información fue enviada con éxito, estaremos en contacto contigo</Modal.Body>
                    </Modal>
                }
            </div>
        );
    }

    private getClickedName(item: IAirline) {
        this.setState({
            ...this.state,
            selectedAirline: item
        });
    }

    private _onChangeTextInput(event: any): void {
        this.setState({
            model: {
                ...(this.state.model as any),
                [event.target.id]: event.target.value
            }
        });
    }

    private _save(event: any) {
        event.preventDefault();
        console.log(this.state.model);
        this.setState({
            ...this.state,
            showConfirmationMessage: true
        });
        setTimeout(() => {
            this.closeConfirmationMessage();
        }, 5000);
    }

    private closeConfirmationMessage() {
        this.setState({
            ...this.state,
            showConfirmationMessage: false,
            model: defaultIUser(),
            selectedAirline: defaultIAirline()
        });
    }
}