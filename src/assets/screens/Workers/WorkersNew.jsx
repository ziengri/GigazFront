import * as React from 'react'
import { DataGrid, GridToolbar, ruRU } from '@mui/x-data-grid'
import { Container,Fab,Box,Typography,Dialog,DialogTitle,DialogContent,DialogActions,TextField,Button,
	InputLabel,
	Select,
	MenuItem } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useState,useEffect } from 'react'
import { useForm } from "react-hook-form";
import axios from "../../../../axios"
import { useDispatch,useSelector } from 'react-redux'
import { fetchObjects } from '../../../redux/slices/objectSlice'
import { fetchWorkers } from '../../../redux/slices/workerSlice'

function createData(name, tel, money, supervizor, object, spec) {
	return { name, tel, money, supervizor, object, spec }
}

const columns = [
	{
		field: 'id',
		headerName: 'ID',
		type: 'number',
		width: 30,
	
	},
	{
		field: 'fullName',
		headerName: 'Полное имя',
		width: 150,
	},
	{
		field: 'telephone',
		headerName: 'Телефон',
		width: 150
	},
	{
		field: 'supervisor_name',
		headerName: 'Супервазйер',
		width: 200
	},

	{
		field: 'object_work_name',
		headerName: 'Объект',
		width: 80
	},
	{
		field: 'specialization',
		headerName: 'Специализация',
		width: 160
	},
	{
		field: 'salary',
		headerName: 'Зарплата',
		width: 160
	}

]

const rows = [
	{
		id: 1,
		name: 'Павел Котов',
		tel: '+7(939)38673-96',
		salary: <a href='#1'>123</a>,
		supervizor: 'Серегей Александрович',
		object: 'ТЭЦ',
		spec: 'Разнорабочий'
	},
	{
		id: 2,
		name: 'Павел Котов',
		tel: '+7(939)38673-96',
		salary: '25 000р',
		supervizor: 'Серегей Александрович',
		object: 'ТЭЦ',
		spec: 'Разнорабочий'
	},
	{
		id: 3,
		name: 'Павел Котов',
		tel: '+7(939)38673-96',
		salary: '25 000р',
		supervizor: 'Серегей Александрович',
		object: 'ТЭЦ',
		spec: 'Разнорабочий'
	},
	{
		id: 4,
		name: 'Павел Котов',
		tel: '+7(939)38673-96',
		salary: '25 000р',
		supervizor: 'Серегей Александрович',
		object: 'ТЭЦ',
		spec: 'Разнорабочий'
	},
	{
		id: 5,
		name: 'Павел Котов',
		tel: '+7(939)38673-96',
		salary: '25 000р',
		supervizor: 'Серегей Александрович',
		object: 'ТЭЦ',
		spec: 'Разнорабочий'
	},
	{
		id: 6,
		name: 'Павел Котов',
		tel: '+7(939)38673-96',
		salary: '25 000р',
		supervizor: 'Серегей Александрович',
		object: 'ТЭЦ',
		spec: 'Разнорабочий'
	},
	{
		id: 7,
		name: 'Павел Котов',
		tel: '+7(939)38673-96',
		salary: '25 000р',
		supervizor: 'Серегей Александрович',
		object: 'ТЭЦ',
		spec: 'Разнорабочий'
	},
	{
		id: 8,
		name: 'Павел Котов',
		tel: '+7(939)38673-96',
		salary: '25 000р',
		supervizor: 'Серегей Александрович',
		object: 'ТЭЦ',
		spec: 'Разнорабочий'
	},
	{
		id: 9,
		name: 'Павел Котов',
		tel: '+7(939)38673-96',
		salary: '25 000р',
		supervizor: 'Серегей Александрович',
		object: 'ТЭЦ',
		spec: 'Разнорабочий'
	},
	{
		id: 10,
		name: 'Павел Котов',
		tel: '+7(939)38673-96',
		salary: '25 000р',
		supervizor: 'Серегей Александрович',
		object: 'ТЭЦ',
		spec: 'Разнорабочий'
	}
]

export default function WorkersNew() {
	const {items,status}=useSelector(state=>state.object)
	const {workers}=useSelector(state=>state.worker)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchObjects())
		dispatch(fetchWorkers())

    },[])
	console.log("Workers",workers)
	const [open,setOpen] = useState(false)
	const data = useSelector(state=>state.auth.data)
    const {
        register,
        handleSubmit,
        setError,
        formState:{errors,isValid}
    }=useForm({
        defaultValues:{
            fullName:'',
			telephone:'',
			specialization:'',
			object_work_id:'',
        },
        mode:'onChange'
    });
    const onSubmit= async (values)=>{
        console.log('Add worker: ',
		{...values,supervisor_id:data._id,})
		const date = {...values,supervisor_id:data._id,}
        axios.post(`api/worker`,date).then((res)=>{
            // setLoad(Math.random())
            setOpen(false)
            console.log("пРИХОД",res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
	console.log(items)
	return (
		<Container sx={{ height: 500 }}>
			<Box sx={{display:'flex',mt:"0.9em",mb:'0.4em'}}> <Typography sx={{textAlign:'center',flexGrow:1}} variant='h4'>Рабочие</Typography>
				<Fab onClick={()=>(setOpen(true))} size="medium" color="secondary" aria-label="add"><Add/></Fab>
			</Box>
                <Dialog open={open} onClose={()=>(setOpen(false))}>
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <DialogTitle>Добавить рабочего</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="name"
                            label="ФИО"
                            error={Boolean(errors.fullName?.message)}
                            helperText={errors.fullName?.message}
                            {...register('fullName',{required:'Введите Имя и Фамилию'})}
                            type="text"
                            fullWidth
                            variant="standard"
                        />
						<TextField
                            autoFocus
							margin="normal"
							id="telephone"
                            label="Телефон(без +7)"
                            error={Boolean(errors.telephone?.message)}
                            helperText={errors.telephone?.message}
                            {...register('telephone',{required:'Введите телефон'})}
                            type="number"
                            fullWidth
                            variant="standard"
                        />
						<InputLabel sx={{marginTop:"10px"}} id="selectSpec">Специализация</InputLabel>
                        <Select
                        labelId="selectSpec"
                        id="selectSpec"
                        label="Специализация"
                        fullWidth
                        variant="standard"
                        error={Boolean(errors.specialization?.message)}
                        helperText={errors.specialization?.message}
                        {...register('specialization',{required:'Выберите специализацию'})}
                        >
                            {/* {!items?<></>:items.map((el,index)=>( */}
                            {/* <MenuItem key={index} value={el.storageId}>{el.name}</MenuItem> */}
                            {/* ))} */}
							<MenuItem  value='Разнорабочий'>Разнорабочий</MenuItem>
                        </Select>

						<InputLabel id="selectObj">Объект работы</InputLabel>
                        <Select
                        labelId="selectObj"
                        id="selectObj"
                        label="Объект работы"
                        fullWidth
                        variant="standard"
                        error={Boolean(errors.object_work_id?.message)}
                        helperText={errors.object_work_id?.message}
                        {...register('object_work_id',{required:'Выбирите обект работы'})}
                        >
                            {!items?<></>:items.map((el,index)=>(
                            <MenuItem key={index} value={el._id}>{el.name}</MenuItem>
                            ))}

                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>(setOpen(false))}>Отменить</Button>
                        <Button type="submit" variant='outlined'>Добавить</Button>
                    </DialogActions>
                    </form>
                </Dialog>
			<DataGrid
				localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
				rows={workers}
				columns={columns}
				initialState={{
					columns: {
						columnVisibilityModel: {
						  id: false,
						  supervisor_name:false
						}},
					pagination: {
						paginationModel: {
							pageSize: 7
						}
					}
				}}
				pageSizeOptions={[5]}
				// checkboxSelection
				disableRowSelectionOnClick
				slots={{
					toolbar: GridToolbar
				}}
			/>
		</Container>
	)
}