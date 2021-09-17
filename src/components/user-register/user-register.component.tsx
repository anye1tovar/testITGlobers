import React from 'react';
import { defaultIAirline, IAirline } from '../../classes/airlines';
import { UserRegisterProps } from './user-register.props';
import { defaultUserRegisterState, UserRegisterState } from './user-register.state';

export default class userRegisterComponent extends React.Component<UserRegisterProps, UserRegisterState> {
    constructor(props: UserRegisterProps) {
        super(props);
        this.state = defaultUserRegisterState();
        this.getClickedName = this.getClickedName.bind(this);
    }

    componentDidMount() {
        // Get airlines data
        const json = '[{"IdAirline":"1", "Name": "Avianca"},{"IdAirline":"1", "Name": "Latam"},{"IdAirline":"1", "Name": "VivaAir"}]'
        const airlines: IAirline[] = JSON.parse(json);
        this.setState({
            airlines
        })
    }

    render() {
        const items = this.state.airlines.map((item) => {
            return <li onClick={this.getClickedName.bind(this, item)} className="list-group-item">{item.Name}</li>
        })
        return (
            <div className="container-fluid">
                <h1>¡Bienvenido!</h1>
                <h2>Por favor selecciona tu aerolinea:</h2>
                <ul className="list-group list-group-horizontal">
                    {items}
                </ul>
                {
                    this.state.selectedAirline != defaultIAirline() &&
                    <div>
                        <h1>Hola, bienvenido, sabemos que quieres viajar en un {this.state.selectedAirline.Name}, por favor diligencia el siguiente formulario:</h1>

                        <form onSubmit={this._save.bind(this)}>
                            <label>
                                Nombre completo:
                                <input type="text" value={this.state.model.Name} onChange={() => this._onChangeTextInput.bind(this, 'Name')} />
                                Email:
                                <input type="email" value={this.state.model.Email} onChange={() => this._onChangeTextInput.bind(this, 'Email')} />
                                Celular:
                                <input type="number" value={this.state.model.Cellphone} onChange={() => this._onChangeTextInput.bind(this, 'Cellphone')} />
                                Rango de edad:
                                <input type="text" value={this.state.model.Age} onChange={() => this._onChangeTextInput.bind(this, 'Age')} />
                            </label>
                            <input type="submit" value="Enviar" />
                        </form>

                    </div>
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

    private _onChangeTextInput(property: string, value: string) {
        this.setState({
            model: {
                ...(this.state.model as any),
                [property]: value
            }
        });
    }

    private _save() {
        console.log(this.state.model);
    }
}