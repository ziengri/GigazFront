import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'

function createData(name, tel, money, supervizor, object, spec) {
	return { name, tel, money, supervizor, object, spec }
}

const rows = [
	createData('Павел Котов', '+7(939)386-73-96', '20 000руб', 'Серегей Александович', 'ТЭЦ', 'Разнорабочий'),
	createData('Павел Котов', '+7(939)386-73-96', '20 000руб', 'Серегей Александович', 'ТЭЦ', 'Разнорабочий'),
	createData('Павел Котов', '+7(939)386-73-96', '20 000руб', 'Серегей Александович', 'ТЭЦ', 'Разнорабочий'),
	createData('Павел Котов', '+7(939)386-73-96', '20 000руб', 'Серегей Александович', 'ТЭЦ', 'Разнорабочий'),
	createData('Павел Котов', '+7(939)386-73-96', '20 000руб', 'Серегей Александович', 'ТЭЦ', 'Разнорабочий')
]


export default function Workers() {

	return (
		<Container>
			<Typography>Список рабочих</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>ФИО</TableCell>
							<TableCell align='center'>Телефон</TableCell>
							<TableCell align='right'>Зарплата&nbsp;(руб)</TableCell>
							<TableCell align='center'>Закрпелен за</TableCell>
							<TableCell align='right'>Объект</TableCell>
							<TableCell align='right'>Профессия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow
								key={row.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{row.name}
								</TableCell>
								<TableCell align='right'>{row.tel}</TableCell>
								<TableCell align='right'>{row.money}</TableCell>
								<TableCell align='right'>{row.supervizor}</TableCell>
								<TableCell align='right'>{row.object}</TableCell>
								{/*<TableCell align="right">{row.spec}</TableCell>*/}
								<TableCell align='right'><Button variant='outlined'>123</Button></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

		</Container>
	)
}