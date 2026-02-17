import { DataSource } from 'typeorm';
import { AppDataSourceMock } from '../../__mocks__/appDataSourceMock';

export const TestDataSource = AppDataSourceMock.mockAppDataSource();
