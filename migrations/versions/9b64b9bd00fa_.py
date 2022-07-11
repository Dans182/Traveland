"""empty message

Revision ID: 9b64b9bd00fa
Revises: fed319310914
Create Date: 2022-07-11 11:30:17.420251

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b64b9bd00fa'
down_revision = 'fed319310914'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('trip', sa.Column('imagen_6', sa.String(length=300), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('trip', 'imagen_6')
    # ### end Alembic commands ###