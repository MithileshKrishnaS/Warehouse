import React,{useState, useEffect} from 'react';
import './Warehouse.css';
import { getAll } from '../../slices/listSlice';
import { setDetail } from '../../slices/detailSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../store';
import { Tooltip } from '../../common/Tooltip/Tooltip';
import { Dropdown } from '../../common/Dropdown/Dropdown';
import location from "../../images/location.svg";
import { Input } from '../../common/Input/Input';

export function Warehouse() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: any) => state.list)
    const navigate = useNavigate();
    
    let [list, setList] = useState([]);
    const [city, setCity] = useState([]);
    const [cluster, setCluster] = useState([]);
    const [type, setType] = useState([]);
    const [selectedCity, setSelectedCity] = useState('City');
    const [selectedCluster, setSelectedCluster] = useState('Cluster');
    const [selectedType, setSelectedType] = useState('Type');
    const [search, setSearchData] = useState('');

    useEffect(()=> {
        if(!data.length) {
            dispatch(getAll());
        }
    },[]);

    useEffect(() => {
        addData();
    }, [data]);

    useEffect(() => {
        const filteredData = data.filter((item: any) => {
          const cityMatch = selectedCity === 'City' || item.city === selectedCity;
          const clusterMatch = selectedCluster === 'Cluster' || item.cluster === selectedCluster;
          const typeMatch = selectedType === 'Type' || item.type === selectedType;
          const searchMatch = search === '' || item.name.toLowerCase().includes(search.toLowerCase());
          return cityMatch && clusterMatch && typeMatch && searchMatch;
        });
    
        setList(filteredData);
      }, [selectedCity, selectedCluster, selectedType, search]);

    function addData() {
        setList(data);
        const cityArray: any = ['City'];
        const clusterArray: any = ['Cluster'];
        const typeArray: any = ['Type'];

        data.forEach((each: any)=>{
            if(!cityArray.includes(each.city)) {
                cityArray.push(each.city);
            }
            if(!clusterArray.includes(each.cluster)) {
                clusterArray.push(each.cluster);
            }
            if(!typeArray.includes(each.type)) {
                typeArray.push(each.type);
            }
        });

        setCity(cityArray);
        setCluster(clusterArray);
        setType(typeArray);
    }
    
    function passData(id: number) {
        dispatch(setDetail(data[id-1]));
        navigate("detail/"+id);
    }

    const updated = (each: any) => {
        switch (each.type) {
            case 'city':
                setSelectedCity(each.value);
                break;
            case 'cluster':
                setSelectedCluster(each.value);
                break;
            case 'type':
                setSelectedType(each.value);
                break;
            case 'search' :
                setSearchData(each.value);
                break;
        }
    }
 
    
    return (
        <div className='warehouse'>
            <div className='filters'>
                <div className='each'>
                    <Dropdown option={city} selected={selectedCity} sendOutput={updated} type={'city'} size={16}/>
                </div>
                <div className='each'>
                    <Dropdown option={cluster} selected={selectedCluster} sendOutput={updated} type={'cluster'} size={16}/>
                </div>
                <div className='each'>
                    <Dropdown option={type} selected={selectedType} sendOutput={updated} type={'type'} size={16}/>
                </div>
                <div className='each'>
                    <Input value={search} data={updated} type={'search'} size={16}/>
                </div>
            </div>
            <div className="whole">
                {list && list.length ? list.map((each:any) => (
                    <div className='each-div' role="button" key={each.id} onClick={()=>passData(each.id)}>
                        <div key={each.id} role='button'>
                            <div className='space-bet'>
                                <div className='name'>{each.name}</div>
                                <div className={`islive ${each.is_live ? 'green': 'red'}`}>
                                    <Tooltip text={each.is_live ? 'live' : 'not live'}/>
                                </div>
                            </div>
                            <hr></hr>
                            <div>
                                <img src={each.image} className='ware-img' />
                            </div>
                            <div className='space-bet mt-20'>
                                <div className='city-list'><img src={location} /> {each.city}</div>
                                <div className={`register ${each.is_registered ? 'reg' : 'no-reg'}`}>{each.is_registered ? 'Registered' : 'Not Registered'}</div>
                            </div>
                            <div>Type : {each.type}</div>
                            <div className='space-bet'>
                                <div>Space Available : {each.space_available}</div>
                                <div className='cluster'>{each.cluster}</div>
                            </div>
                        </div>
                    </div>
                    )
                ) : loading ? 'loading...' : 'No Data'}
            </div>
        </div>
    );
};