import { conditional } from '@silverhand/essentials';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

import type { Props as PaginationProps } from '@/ds-components/Pagination';
import Pagination from '@/ds-components/Pagination';

import OverlayScrollbar from '../OverlayScrollbar';

import TableEmptyWrapper from './TableEmptyWrapper';
import TableError from './TableError';
import TableLoading from './TableLoading';
import * as styles from './index.module.scss';
import type { Column, RowGroup } from './types';

export type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  rowGroups: Array<RowGroup<TFieldValues>>;
  columns: Array<Column<TFieldValues>>;
  rowIndexKey: TName;
  filter?: ReactNode;
  isRowHoverEffectDisabled?: boolean;
  isRowClickable?: (row: TFieldValues) => boolean;
  rowClickHandler?: (row: TFieldValues) => void;
  rowClassName?: (row: TFieldValues, index: number) => string | undefined;
  className?: string;
  headerTableClassName?: string;
  bodyTableWrapperClassName?: string;
  isLoading?: boolean;
  pagination?: PaginationProps;
  placeholder?: ReactNode;
  loadingSkeleton?: ReactNode;
  errorMessage?: string;
  hasBorder?: boolean;
  onRetry?: () => void;
  /** A footer that will be rendered on the bottom-left of the table. */
  footer?: ReactNode;
};

function Table<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  rowGroups,
  columns,
  rowIndexKey,
  filter,
  isRowHoverEffectDisabled = false,
  rowClickHandler,
  isRowClickable = () => Boolean(rowClickHandler),
  rowClassName,
  className,
  headerTableClassName,
  bodyTableWrapperClassName,
  isLoading,
  pagination,
  placeholder,
  loadingSkeleton,
  errorMessage,
  hasBorder,
  onRetry,
  footer,
}: Props<TFieldValues, TName>) {
  const totalColspan = columns.reduce((result, { colSpan }) => {
    return result + (colSpan ?? 1);
  }, 0);

  const hasData = rowGroups.some(({ data }) => data?.length);
  const hasError = !isLoading && !hasData && errorMessage;
  const isEmpty = !isLoading && !hasData && !errorMessage;
  const isLoaded = !isLoading && hasData;

  return (
    <div className={classNames(styles.container, className)}>
      <div className={classNames(styles.tableContainer, hasBorder && styles.hasBorder)}>
        {filter && (
          <div className={styles.filterContainer}>
            <div className={styles.filter}>{filter}</div>
          </div>
        )}
        <table
          className={classNames(
            styles.headerTable,
            filter && styles.hideTopBorderRadius,
            headerTableClassName
          )}
        >
          <thead>
            <tr>
              {columns.map(({ title, colSpan, dataIndex }) => (
                <th key={dataIndex} colSpan={colSpan}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <OverlayScrollbar
          className={classNames(
            styles.bodyTable,
            isEmpty && styles.empty,
            bodyTableWrapperClassName
          )}
        >
          <table>
            <tbody>
              {isLoading &&
                (loadingSkeleton ?? (
                  <TableLoading columnSpans={columns.map(({ colSpan }) => colSpan ?? 1)} />
                ))}
              {hasError && (
                <TableError columns={columns.length} content={errorMessage} onRetry={onRetry} />
              )}
              {isEmpty && (
                <TableEmptyWrapper columns={columns.length}>{placeholder}</TableEmptyWrapper>
              )}
              {isLoaded &&
                rowGroups.map(({ key, label, labelClassName, data }) => (
                  <Fragment key={key}>
                    {label && (
                      <tr>
                        <td colSpan={totalColspan} className={labelClassName}>
                          {label}
                        </td>
                      </tr>
                    )}
                    {data?.map((row, rowIndex) => {
                      const rowClickable = isRowClickable(row);

                      const onClick = conditional(
                        rowClickable &&
                          rowClickHandler &&
                          (() => {
                            rowClickHandler(row);
                          })
                      );

                      return (
                        <tr
                          key={row[rowIndexKey]}
                          className={classNames(
                            rowClickable && styles.clickable,
                            !isRowHoverEffectDisabled && styles.hoverEffect,
                            rowClassName?.(row, rowIndex)
                          )}
                          onClick={onClick}
                        >
                          {columns.map(({ dataIndex, colSpan, className, render }) => (
                            <td key={dataIndex} colSpan={colSpan} className={className}>
                              {render(row, rowIndex)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </OverlayScrollbar>
      </div>
      <div className={styles.footer}>
        {/* Fall back to a div if footer is not provided to avoid layout shift. */}
        {footer ?? <div />}
        {pagination && <Pagination className={styles.pagination} {...pagination} />}
      </div>
    </div>
  );
}

export default Table;
