import {useState, useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import { Dropdown } from "../../common/Dropdown/Dropdown";
import { Input } from "../../common/Input/Input";
import './Details.css';
import location from '../../images/location.svg';
import edit from '../../images/edit.svg';
import back from '../../images/arrow-left.svg';
import { useNavigate } from "react-router-dom";
import { AppDispatch } from '../../store';
import { setDetail } from "../../slices/detailSlice";
import { updateDet } from "../../slices/listSlice";

export function Details() {
    const dispatch = useDispatch<AppDispatch>();
    const { details } = useSelector((state: any) => state.details);
    let list = useSelector((state: any) => state.list.data);
    const [liveClasses, setLiveClass] = useState("live");
    const [isEditState, setEditState] = useState(false);
    const navigate = useNavigate();

    let det = {...details};

    useEffect(()=>{
        setLiveClass(`live ${details && details.is_live ? 'green' : 'red'}`);
    },[details, details.is_live])

    let updated = (data: any) => {
        switch (data.type) {
            case 'city':
                det.city = data.value;
                break;
            case 'cluster':
                det.cluster = data.value;
                break;
            case 'name':
                det.name = data.value;
                break;
            case 'is_live':
                det.is_live = data.value;
                break;
            case 'type':
                det.type = data.value;
                break;
        }
    }

    let submitDetails = () => {
        dispatch(setDetail(det));
        let updatedList = list.map((each: any) => {
            if (each.id === det.id) {
                return { ...each, ...det };
            }
            return each;
        });
        dispatch(updateDet(updatedList));
        setEditState(false);
    }

    return (
        <div className="whole-det">
            <div className="top flex flex-between flex-dir gap-10">
                <div className="flex det-each flex-dir">
                    <div className="back" role="button" onClick={()=> navigate("/")}>
                        <img src={back} className="icons"/>
                    </div>
                    <div className="name">
                        {!isEditState && details && details.name ? details.name : null}
                        {isEditState && (
                                <Input value={details.name} data={updated} type={'name'} size={30}/>
                            )
                        }
                    </div>
                </div>
                <div className="flex det-each flex-dir">
                    <div className="status">
                        {!isEditState && (
                            <div className="status">
                                <span className={liveClasses}></span> {details && details.is_live ? 'live' : 'not live'}
                            </div>
                            ) 
                        }
                        {isEditState && (
                            <Dropdown option={['live', 'not live']} selected={details.is_live ? 'live' : 'not live'} sendOutput={updated} type={'is_live'} size={14}></Dropdown>
                        )}
                    </div>
                    <div className="edit-det">
                        <img src={edit} className="editbtn icons" role="button" onClick={()=>{setEditState(!isEditState)}}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-between py-20 align-center flex-dir gap-10">
                <div className="cluster">
                    Cluster : {
                                (!isEditState && details && details.cluster ? details.cluster : null) || 
                                (isEditState && (<Input value={details.cluster} data={updated} type={'cluster'} size={16}/>))
                            }
                </div>
                <div className="flex">
                    Type : {
                        (!isEditState && details && details.type ? details.type : null) || 
                        (isEditState && ( <Dropdown option={["Warehouse Service", "Leasable Space"]} selected={details.type} sendOutput={updated} type={'type'} size={16}></Dropdown>))
                    }
                </div>
                <div className="location">
                    <img src={location} className="icons"/>
                    <div className="city">{(!isEditState && details && details.city ? details.city : null) || 
                    (isEditState && (<Input value={details.city} data={updated} type={'city'} size={16} width={180}/>))}</div>
                </div>
            </div>

            {isEditState && (<button onClick={submitDetails} className="det-submit">Submit</button>)}

            <div className="det-img-text">
                <img src={details.image}/>
                <div>{details.details}</div>
            </div>
        </div>
    )
}