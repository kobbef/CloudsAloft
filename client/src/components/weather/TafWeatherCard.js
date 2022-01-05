import React, {Component} from 'react';
import '../../css/SegmentedBar.css'

import M from 'materialize-css';
import axios from 'axios';
import getTafSegmentsWithFlightCond from '../../utils/tafUtilities';
import tafSegmentedBar from './tafSegmentedBar';
import clearIcon from '../../assets/images/clear.png'


class TafWeatherCard extends Component {

    state = { show: false,
              rawText:"",
              tafData: [],
              tafBarData:[],
              loading: true };


    async componentDidMount(){
        const { data: tafData } = await axios.get( '/api/wx/point/taf/' + this.props.ident )
        this.setState( { rawText: tafData.raw_text } );
        this.setState( { tafData } );
        this.setState( { loading: false }, );

        this.setState( {tafBarData: getTafSegmentsWithFlightCond( this.state.tafData ) } );

    }

    componentDidUpdate() {
        let collapsible = document.querySelectorAll(".collapsible");
        let modal = document.querySelectorAll(".modal");
        M.Collapsible.init(collapsible, {});
        M.Modal.init(modal,{});
        M.AutoInit();
      }


    renderContent(){
    return(         <div>
                        <div className="card-content blue-grey lighten-5 z-depth-1" style={{borderRadius: '2rem', borderColor:'black', borderWidth:'5px'}}>
                                <img src={clearIcon} alt="Logo" width="25rem" height="25rem" />
                                <span className="card-title" style={{ color: 'black', fontSize: '1em' }}>{this.props.ident }</span>
                                { this.state.loading ? <div className="progress" >
                                    <div className="indeterminate blue lighten-3"></div>
                                </div> : null }
                                { tafSegmentedBar(this.state.tafBarData)}
                        </div>
                    </div>
        );
    };

    render(){
        return(
                <div>
                {this.renderContent()}
                </div>
 
      );
    }
}



export default TafWeatherCard;